package com.example.demo.auth;
import com.example.demo.model.Civilite;
import com.example.demo.model.Gouvernorat;
import com.example.demo.service.CiviliteService;
import com.example.demo.service.GouvernoratService;
import com.example.demo.user.User;
import com.example.demo.user.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import com.example.demo.user.Role;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins ="http://localhost:4200")

@RequiredArgsConstructor
public class AuthenticationController {

  private final AuthenticationService service;
  private final GouvernoratService gouvernoratService;
  private final CiviliteService civiliteService;
  @GetMapping(value ="/civilites" )
  public List<Civilite> getCivilitess(){
    return civiliteService.getCivilites();
  }

  @GetMapping(value ="/civilites/noms" )
  public List<String> getCiviliteNamess() {
    List<Civilite> civilites = civiliteService.getCivilites();
    List<String> civiliteNames = new ArrayList<>();
    for (Civilite civilite : civilites) {
      civiliteNames.add(civilite.getNom());
    }
    return civiliteNames;
  }


  @GetMapping(value ="/gouvernoratss" )
  public List<Gouvernorat> getgouvernoratss(){
    return gouvernoratService.getGouvernorats();
  }

  @GetMapping(value ="/gouvernorats/noms" )
  public List<String> getGouvernoratNamess() {
    List<Gouvernorat> gouvernorats = gouvernoratService.getGouvernorats();
    List<String> gouvernoratNames = new ArrayList<>();
    for (Gouvernorat gouvernorat : gouvernorats) {
      gouvernoratNames.add(gouvernorat.getNom());
    }
    return gouvernoratNames;
  }

  @PostMapping("/authenticate")
  public ResponseEntity<AuthenticationResponse> authenticate(
      @RequestBody AuthenticationRequest request
  ) {
    return ResponseEntity.ok(service.authenticate(request));
  }

  @PostMapping("/register/candidat")
  public ResponseEntity<AuthenticationResponse> registerCandidat(
          @RequestBody RegisterCandidatRequest request
  ) {
    if (request.getRole().equals(Role.CANDIDATE)) {
      return ResponseEntity.ok(service.registerCandidat(request));
    } else {
      return ResponseEntity.internalServerError().build();
    }
  }

  @PostMapping("/register/employeur")
  public ResponseEntity<AuthenticationResponse> registerEmployeur(
          @RequestBody RegisterEmployeurRequest request
  ) {
    if (request.getRole().equals(Role.EMPLOYER)) {
      return ResponseEntity.ok(service.registerEmployeur(request));
    } else {
      return ResponseEntity.internalServerError().build();
    }
  }

  @PostMapping("/refresh-token")
  public void refreshToken(
      HttpServletRequest request,
      HttpServletResponse response
  ) throws IOException {
    service.refreshToken(request, response);
  }

  @GetMapping("hello")
  String sayHello() {
	  
	  return "hello";
  }

}
