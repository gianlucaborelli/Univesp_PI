package com.sisgem.main.user;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sisgem.main.user.converter.UserMapper;
import com.sisgem.main.user.dto.UserDetailDto;
import com.sisgem.main.user.dto.UserUpdateRequestDto;

import jakarta.annotation.Nonnull;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository repository;

    @Autowired
    private UserMapper mapper;
    
    @GetMapping("/")
    public ResponseEntity<List<UserDetailDto>> listAll() {
        return ResponseEntity.ok().body(mapper.toUserDetailList(repository.findAll()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDetailDto> findById(@PathVariable UUID id) {        
        if (id != null){
            var user = repository.findById(id).orElse(null);

            if(user != null){
                return ResponseEntity.ok().body(mapper.toUserDetail(user));
            }
            return  ResponseEntity.notFound().build();
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping
    public ResponseEntity<List<UserDetailDto>> findByName(@RequestParam("name") String name) {
        var users = repository.findByNameContaining(name);

        return ResponseEntity.ok().body(mapper.toUserDetailList(users));
    }

    @PostMapping
    public ResponseEntity<UserDetailDto> save(@RequestBody User user) {
        if(user == null){
            return ResponseEntity.badRequest().build();
        }

        user = repository.save(user);
        return ResponseEntity.ok().body(mapper.toUserDetail(user));
    }

    @PutMapping
    public ResponseEntity<UserDetailDto> edit(@RequestBody UserUpdateRequestDto userToUpdate) {
        if (userToUpdate.getId() == null){
            return ResponseEntity.badRequest().build();
        }

        var userOnDataBase = repository.findById(userToUpdate.getId());

        if (!userOnDataBase.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        var userToSave = userOnDataBase.get();

        userToSave.setName(userToUpdate.getName());
        userToSave.setEmail(userToUpdate.getEmail());
        userToSave.setObs(userToUpdate.getObs());

        userToSave = repository.save(userToSave);
        return ResponseEntity.ok().body(mapper.toUserDetail(userToSave));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        if(id == null){
            return ResponseEntity.badRequest().build();    
        }

        repository.deleteById(id);
        return ResponseEntity.noContent().build(); 
    }
}
