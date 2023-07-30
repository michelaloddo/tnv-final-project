package com.thenetvalue.raccoltaUtenti.service;

import com.thenetvalue.raccoltaUtenti.dao.UserRepositoryDAO;
import com.thenetvalue.raccoltaUtenti.model.UpdateUser;
import com.thenetvalue.raccoltaUtenti.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    UserRepositoryDAO userDAO;
    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(@Qualifier("dbUserDAO") UserRepositoryDAO userDAO) {
        this.userDAO = userDAO;
    }

    public User logIn(String username, String password) throws IllegalArgumentException {
        if (username == null || password == null) {
            throw new IllegalArgumentException("Username e password obbligatori per effettuare il login");
        } else {
            User user = userDAO.findByUsername(username);
            if (user == null || !passwordEncoder.matches(password, user.getPassword())) {
                throw new IllegalArgumentException("Username o password non corretti");
            }
            return user; // Restituisce l'oggetto User se il login è avvenuto con successo
        }
    }

    public User registerUser(User user)throws IllegalArgumentException{
        boolean result = userDAO.existsByUsername(user.getUsername());
        if (!result) {
           if (user.getUsername() != null && user.getEmail() != null) {
               if (user.getPassword() == null) {
                    user.generateDefaultPassword();
                }
                user.setPassword(passwordEncoder.encode(user.getPassword()));
                user.setEnabled(true);
                user.setAuthoritiesUser();
                userDAO.save(user);
                return user;
            } else {
                throw new IllegalArgumentException("Username ed Email obbligatori.");
           }
        }else {
            throw new IllegalArgumentException("Username gia' presente.");
       }
    }

    public Optional<User> getUser(int id) {
        return userDAO.findById(id);
    }

    public Iterable<User> allUsers() {
        return userDAO.findAll();
    }

    public User updateUser(int id, User user) {
        user.setId(id);
        userDAO.save(user);
        return user;
    }

    public String deleteUser(int id) {
        User user = userDAO.findById(id).orElse(null);
        if (user != null) {
            userDAO.delete(user);
            return "Utente cancellato correttamente";
        } else {
            return "Utente non trovato!";
        }
    }

    public List<User> searchUserByUsername(String partialUsername) {
        return userDAO.findByUsernameContains(partialUsername);
    }

    public List<User> searchUserByUsernameAndEmail(String partialUsername, String partialMail) {
        return userDAO.findByUsernameContainsAndEmailContains(partialUsername, partialMail);
    }

    public User updatePointsUser(int id,int points) {
        User user = userDAO.findById(id).orElse(null);
        if (user != null) {
            user.setPoints(user.getPoints() + points);
            userDAO.save(user);
            return user;
        }
        else return null;
    }

    public User updatePasswordAndEmail(int id, UpdateUser updateUser) {
        User user = userDAO.findById(id).orElse(null);
        if (user != null) {
            String newPassword = user.getPassword();
            if (newPassword != null) {
                String hashedPassword = passwordEncoder.encode(newPassword);
                updateUser.setPassword(hashedPassword);
            }

            String newEmail = user.getEmail();
            if (newEmail != null) {
                updateUser.setEmail(newEmail);
            }

            userDAO.save(updateUser);
            return updateUser;
        } else {
            return null;
        }
    }



}



