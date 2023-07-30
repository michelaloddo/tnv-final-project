package com.thenetvalue.raccoltaUtenti.controller;

import com.thenetvalue.raccoltaUtenti.model.UpdateUser;
import com.thenetvalue.raccoltaUtenti.model.User;
import com.thenetvalue.raccoltaUtenti.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:4200/")
public class UserController {
    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @CrossOrigin(origins = "http://localhost:4200/")
    @PutMapping("/{id}/{points}")
    public User updatePointsUser(@PathVariable("id") int id,@PathVariable("points")int points) {
        return userService.updatePointsUser(id, points);
    }

    @PostMapping("/register")
    public User addUser(@RequestBody User user) {
            return userService.registerUser(user);
    }


    @PostMapping("/login")
    public User loginUser(@RequestBody User user) {
        return  userService.logIn(user.getUsername(), user.getPassword());
    }

    @GetMapping("users/{id}")
    public Optional<User> getUserById(@PathVariable("id") int id) {
        return userService.getUser(id);
    }

    @GetMapping("users/search/username/{partialUsername}")
    public List<User> searchUserByUsername(@PathVariable("partialUsername") String partialUsername) {
        return userService.searchUserByUsername(partialUsername);
    }

    @GetMapping("users/search/username/{partialUsername}/mail/{partialMail}")
    public List<User> searchUserByUsername(@PathVariable("partialUsername") String partialUsername,
                                           @PathVariable("partialMail") String partialMail) {
        return userService.searchUserByUsernameAndEmail(partialUsername, partialMail);
    }

    @GetMapping("/all")
    public Iterable<User> allUsers() {
        return userService.allUsers();
    }

    @DeleteMapping("users/{id}")
    public String deleteUser(@PathVariable("id") int id) {
        return userService.deleteUser(id);
    }

    @PutMapping("/{id}")
    public String updatePasswordAndEmail(@PathVariable("id") int id, @RequestBody UpdateUser updateUser) {
        User updatedUser = userService.updatePasswordAndEmail(id, updateUser);

        if (updatedUser != null) {
            return "Password e Mail aggiornate correttamente";
        } else {
            return "User non trovato";
        }
    }
}
