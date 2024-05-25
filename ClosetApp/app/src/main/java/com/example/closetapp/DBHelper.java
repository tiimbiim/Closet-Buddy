package com.example.closetapp;

import android.content.Context;
import android.database.sqlite.SQLDatabase;
import android.database.sqlite.SQLiteOpenHelper;

public class DBHelper extends SQLiteOpenHelper {

    private static final String DATABASE_NAME = ""; //TODO choose a db name;
    private static final int DATABASE_VERSION = 1;

    public DBHelper(Context context) {
        super(context, DATABASE_NAME, null, DATABASE_VERSION);
    }

    /
    @Override
    public void onCreate(SQLiteDatabase db) {
        // Create tables
        String CREATE_TABLE = "CREATE TABLE my_table (id INTEGER PRIMARY KEY, name TEXT, value TEXT)";
        db.execSQL(CREATE_TABLE);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        // Handle database upgrade
        db.execSQL("DROP TABLE IF EXISTS my_table");
        onCreate(db);
    }
}


}
