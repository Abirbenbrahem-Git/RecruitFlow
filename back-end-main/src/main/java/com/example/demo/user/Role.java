package com.example.demo.user;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static com.example.demo.user.Permission.*;

@RequiredArgsConstructor
public enum Role {

	USER(Collections.emptySet()),
	ADMIN(Set.of(ADMIN_READ, ADMIN_UPDATE, ADMIN_DELETE, ADMIN_CREATE, MANAGER_READ, MANAGER_UPDATE, MANAGER_DELETE,MANAGER_CREATE)),
	MANAGER(Set.of(MANAGER_READ, MANAGER_UPDATE, MANAGER_DELETE, MANAGER_CREATE)),
	CANDIDATE(Set.of(CANDIDATE_READ, CANDIDATE_UPDATE, CANDIDATE_CREATE, CANDIDATE_DELETE)),
	EMPLOYER(Set.of(EMPLOYER_READ,EMPLOYER_CREATE, EMPLOYER_UPDATE, EMPLOYER_DELETE,OFFRE_CREATE, OFFRE_DELETE, OFFRE_READ, OFFRE_UPDATE)), ;
	@Getter
	private final Set<Permission> permissions;

	public List<SimpleGrantedAuthority> getAuthorities() {
		List<SimpleGrantedAuthority> authorities = getPermissions().stream()
				.map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
				.collect(Collectors.toList());
		authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
		return authorities;
	}
}
