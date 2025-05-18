package com.example.bookingService.config;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

import java.io.IOException;
import java.sql.Time;
import java.text.ParseException;
import java.text.SimpleDateFormat;

public class TimeDeserializer extends JsonDeserializer<Time> {
    private static final SimpleDateFormat TIME_FORMAT = new SimpleDateFormat("HH:mm:ss");

    @Override
    public Time deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
        String timeStr = p.getText();
        try {
            // Если время пришло без секунд, добавляем их
            if (timeStr.length() == 5) {
                timeStr += ":00";
            }
            return new Time(TIME_FORMAT.parse(timeStr).getTime());
        } catch (ParseException e) {
            throw new IOException("Invalid time format. Expected HH:mm:ss or HH:mm", e);
        }
    }
} 