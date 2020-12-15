package com.example.centralhub.services;

import android.content.Context;
import android.content.SharedPreferences;

import static android.content.Context.MODE_PRIVATE;

public class PrefIO {

    public static String get(Context ctx, String key) {
        SharedPreferences sharedPreferences = ctx.getSharedPreferences("all", MODE_PRIVATE);
        return sharedPreferences.getString(key, "");
    }

    public static void set(Context ctx, String key, String value) {
        SharedPreferences sharedPreferences = ctx.getSharedPreferences("all", MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putString(key, value);
        editor.commit();
    }
}
