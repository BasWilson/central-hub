package com.example.centralhub.interfaces;

import org.json.JSONObject;

public interface VolleyCallback{
    void onSuccess(JSONObject jsonObject);
    void onError();
}