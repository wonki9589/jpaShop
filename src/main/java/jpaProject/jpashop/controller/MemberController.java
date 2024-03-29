package jpaProject.jpashop.controller;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import jpaProject.jpashop.domain.Address;
import jpaProject.jpashop.domain.Member;
import jpaProject.jpashop.repository.MemberRepository;
import jpaProject.jpashop.repository.UserRepository;
import jpaProject.jpashop.service.CustomUserDetailsService;
import jpaProject.jpashop.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URI;
import java.util.Arrays;

@Controller
@RequiredArgsConstructor
public class MemberController {

    private final MemberRepository memberRepository;
    private final UserRepository userRepository;
    private final MemberService memberService;

    @ResponseBody
    @GetMapping("/api/member")
    public ResponseEntity<Member> showInfo(@RequestParam(name = "username") String username) {

       // memberRepository.findByUserName(username);
        userRepository.findByUsername(username);
        return ResponseEntity.ok(userRepository.findByUsername(username));
    }


    @ResponseBody
    @GetMapping("/api/member/new/exist")
    public ResponseEntity<Boolean> checkUsernameDuplicate(@RequestParam(name = "username") String username) {
        memberService.existByUsername(username);

        return ResponseEntity.ok( memberService.existByUsername(username) );
    }

    @ResponseBody
    @PostMapping("/api/member/new")
    public ResponseEntity create(@RequestBody @Valid MemberForm memberForm){

        Address address = new Address(memberForm.getCity(),memberForm.getStreet(),memberForm.getZipcode());

        Member member = new Member();
        member.setUsername(memberForm.getUsername());
        member.setPassword(memberForm.getPassword());
        member.setEmail(memberForm.getEmail());
        member.setAddress(address);

        memberService.join(member);
        return ResponseEntity.ok(200);
    }
    @ResponseBody
    @PostMapping("/api/login")
    public ResponseEntity loginProcess(@RequestBody MemberForm memberForm){

        Member member = new Member();
        member.setUsername(memberForm.getUsername());
        member.setPassword(memberForm.getPassword());

        HttpHeaders headers = new HttpHeaders();
        headers.set("name", member.getUsername());

        return ResponseEntity.ok().headers(headers).body("SUCCESS");
    }


    @ResponseBody
    @PostMapping("/api/profile/update")
    public ResponseEntity profileUpdate(@RequestBody ProfileForm profileForm){

        memberService.updateProfile(profileForm);

        return ResponseEntity.ok(200);
    }

}