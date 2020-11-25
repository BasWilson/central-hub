package com.example.centralhub;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class ArticleDetailActivity extends AppCompatActivity {

    Button loginButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_article_detail);
        getSupportActionBar().hide();
        setup();
    }

    private void setup() {
        loginButton = (Button)findViewById(R.id.loginButton);
        if (loginButton != null) {
            loginButton.setOnClickListener(this::onClick);
        }
    }

    private void onClick(View v) {
        Intent intent = new Intent(ArticleDetailActivity.this, HubActivity.class);
        startActivity(intent);
    }
}