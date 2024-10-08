package com.example.demo.user;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Permission {
    ADMIN_READ("admin:read"),
    ADMIN_UPDATE("admin:update"),
    ADMIN_CREATE("admin:create"),
    ADMIN_DELETE("admin:delete"),
    MANAGER_READ("management:read"),
    MANAGER_UPDATE("management:update"),
    MANAGER_CREATE("management:create"),
    MANAGER_DELETE("management:delete"),
    CANDIDATE_READ("candidat:read"),
    CANDIDATE_UPDATE("candidat:update"),
    CANDIDATE_CREATE("candidat:create"),
    CANDIDATE_DELETE("candidat:delete"),
    EMPLOYER_READ("employeur:read"),
    EMPLOYER_CREATE("employeur:create"),
    EMPLOYER_UPDATE("employeur:update"),
    EMPLOYER_DELETE("employeur:delete"),
    OFFRE_READ("offre:read"),
    OFFRE_CREATE("offre:create"),
    OFFRE_UPDATE("offre:update"),
    OFFRE_DELETE("offre:delete")

    ;

    @Getter
    private final String permission;
}
