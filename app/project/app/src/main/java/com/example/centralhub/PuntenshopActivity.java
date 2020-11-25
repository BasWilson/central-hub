package com.example.centralhub;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class PuntenshopActivity extends AppCompatActivity {

    Button logoutButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_puntenshop);
        getSupportActionBar().hide();
        setup();
    }

    private void setup() {
        logoutButton = (Button)findViewById(R.id.logoutButton);
        if (logoutButton != null) {
            logoutButton.setOnClickListener(this::onClick);
        }
    }

    private void onClick(View v) {
        Intent intent = new Intent(PuntenshopActivity.this, MainActivity.class);
        startActivity(intent);
    }
}