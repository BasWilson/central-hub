package com.example.centralhub;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.example.centralhub.interfaces.VolleyCallback;
import com.example.centralhub.services.PrefIO;
import com.example.centralhub.services.RestService;

import org.json.JSONException;
import org.json.JSONObject;

public class MainActivity extends AppCompatActivity {

    Button submitButton, switchButton;
    int currentView = 0;
    EditText emailEdit, passEdit, schoolEdit, nameEdit;
    TextView headerText, subHeaderText;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Check of de gebruiker al heeft ingelogd een keer
        // zo ja, ga direct naar de hub
        if (PrefIO.get(this,"access_token").length() > 0) {
            // switch schermpje
            Intent intent = new Intent(MainActivity.this, HubActivity.class);
            startActivity(intent);
            finish();
        } else {
            // Nog niet ingelogd
            setContentView(R.layout.activity_main);
            getSupportActionBar().hide();
            setup();
        }
    }

    /**
     * Stel alle elementen in
     */
    private void setup() {

        // Buttons
        submitButton = (Button)findViewById(R.id.submitButton);
        switchButton = (Button)findViewById(R.id.switchButton);

        // EditTexts
        emailEdit = (EditText)findViewById(R.id.editTextEmail);
        passEdit = (EditText)findViewById(R.id.editTextPassword);
        schoolEdit = (EditText)findViewById(R.id.editTextSchool);
        nameEdit = (EditText)findViewById(R.id.editTextName);

        // Textviews
        headerText = (TextView)findViewById(R.id.headerText);
        subHeaderText = (TextView)findViewById(R.id.subHeaderText);

        // Onclicks and other manipulations
        if (submitButton != null) {
            submitButton.setOnClickListener(this::validateForm);
            switchButton.setOnClickListener(this::switchViews);
        }
    }

    /**
     * Switch tussen login and register view
     * @param v
     */
    private void switchViews(View v) {
        // Change view
        if (currentView == 0) {
            currentView = 1;
            schoolEdit.setVisibility(View.INVISIBLE);
            nameEdit.setVisibility(View.INVISIBLE);
            schoolEdit.setEnabled(false);
            nameEdit.setEnabled(false);
            headerText.setText("Login");
            submitButton.setText("Login");
            switchButton.setText("Ik heb nog geen account");
        }
        else {
            currentView = 0;
            schoolEdit.setVisibility(View.VISIBLE);
            nameEdit.setVisibility(View.VISIBLE);
            schoolEdit.setEnabled(true);
            nameEdit.setEnabled(true);
            headerText.setText("Registreer");
            submitButton.setText("Registreer");
            switchButton.setText("Ik heb al account");
        }
    }

    /**
     * Valideer inputs en verstuur request naar API
     * @param v
     */
    private void validateForm(View v) {
        String email = emailEdit.getText().toString().trim();
        String password = passEdit.getText().toString().trim();
        String name = nameEdit.getText().toString().trim();
        String school = schoolEdit.getText().toString().trim();

        try {

            // Stop de stuff in een json obj
            JSONObject jsonBody = new JSONObject();
            jsonBody.put("email", email);
            jsonBody.put("password", password);

            // Registreer
            if (currentView == 0) {

                // Check of alles goed is ingevuld voor registratie
                if (email.length() == 0 || password.length() == 0 || name.length() == 0 || school.length() == 0) {
                    Toast.makeText(getBaseContext(), "Vul graag alle velden in", Toast.LENGTH_LONG).show();
                    return;
                }

                // Stop t in een json object
                jsonBody.put("name", name);
                jsonBody.put("school", school);

                // Roep register method die de request naar API maakt
                register(jsonBody);
            } else if (currentView == 1) {

                // Check of alles goed is ingevuld voor login
                if (email.length() == 0 || password.length() == 0) {
                    Toast.makeText(getBaseContext(), "Vul graag alle velden in", Toast.LENGTH_LONG).show();
                    return;
                }

                // Roep sign in method die request naar de API maakt
                signIn(jsonBody);
            }

        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    private void signIn(JSONObject jsonBody) {
        RestService.sendPostRequest(this, "http://10.0.2.2:8080/auth/signin", jsonBody, new VolleyCallback() {
            @Override
            public void onSuccess(JSONObject jsonObject) {
                try {
                    // Ingelogd, sla jwt token op en advance naar volgende scherm
                    PrefIO.set(getBaseContext(), "access_token", jsonObject.getString("accessToken"));
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                // switch schermpje
                Intent intent = new Intent(MainActivity.this, HubActivity.class);
                startActivity(intent);
                finish();
            }

            @Override
            public void onError() {
                Toast.makeText(getBaseContext(), "Kan geen gebruiker vinden met deze gegevens", Toast.LENGTH_LONG).show();
            }
        });
    }

    private void register(JSONObject jsonBody) {
        RestService.sendPostRequest(this, "http://10.0.2.2:8080/users", jsonBody, new VolleyCallback() {
            @Override
            public void onSuccess(JSONObject jsonObject) {
                // Account is gemaakt, verstuur gelijk zonder inderactie de login request er achteraan zodat we
                // een token krijgen en kunnen advancen naar t volgende scherm
                try {
                    // Maak een nieuw json object met de email en ww uit het vorige object
                    JSONObject signInObj = new JSONObject();
                    signInObj.put("email", jsonBody.getString("email"));
                    signInObj.put("password", jsonBody.getString("password"));

                    // probeer in te loggen
                    signIn(signInObj);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }

            @Override
            public void onError() {
                Toast.makeText(getBaseContext(), "Dit e-mailadres is al in gebruik of het is geen Hogeschool e-mailadres", Toast.LENGTH_LONG).show();
            }
        });
    }
}