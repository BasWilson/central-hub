package com.example.centralhub;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;

public class HotspotsActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_hotspots);
        getSupportActionBar().hide();
    }
}