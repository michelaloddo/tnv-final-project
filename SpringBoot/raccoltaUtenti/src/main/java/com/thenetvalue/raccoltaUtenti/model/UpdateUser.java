package com.thenetvalue.raccoltaUtenti.model;

public class UpdateUser extends User{
    private String email;
    private String password;

    public UpdateUser() {
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}