package msc.HME.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*") // for now
public class UserController {

    public UserController() {

    }

//    @GetMapping
    //GET req: user id, resource (ss, faves, user weights)
        //secure way for user id/authorisation to be send???

//    @PostMapping("/update/email")
    //POST user id

//    @PostMapping("/update/resource") ???
    //POST req: user id, new resource (ss, fave, user weights, application )

//    @PatchMapping("/update")
    //PATCH req: user id, updated resource (ss, fave, user weights, application)

//    @DeleteMapping("/remove") ???
    //DELETE: req: user id, deleted resource (ss, fave, user weights, applications)


        // HOW ARE THESE STORED IN THE DB???


}
