package com.example.demo.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.demo.model.CandidateProfile;
import java.util.Optional;

@Repository
public interface CandidatProfilRepository extends JpaRepository<CandidateProfile, Long> {
    Optional<CandidateProfile> findByCandidatId(Integer candidatId);
    @Query("SELECT c FROM CandidateProfile c WHERE c.candidat.id = :candidatId AND c.candidat.email = (SELECT u.email FROM User u WHERE u.id = :candidatId)")
    CandidateProfile findByEmail(@Param("candidatId") Integer candidatId);
}

