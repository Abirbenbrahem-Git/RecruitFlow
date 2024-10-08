package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.demo.model.Candidature;
import java.util.List;

@Repository
public interface CandidatureRepository extends JpaRepository<Candidature, Long> {

    @Query("SELECT c FROM Candidature c WHERE c.user.id = :userId")
    List<Candidature> findByUserId(@Param("userId") Long userId);

    @Query("SELECT c FROM Candidature c WHERE c.id_offre IN (SELECT o.id_offre FROM Offre o WHERE o.user.id = :userId)")
    List<Candidature> findByUserIdAndOffreId(@Param("userId") Long userId);
//    @Query("SELECT o.title FROM Offre  o JOIN Candidature o ON o.id_offre = o.id_offre WHERE c.id_offre = :idOffre")
//    List<Object[]> findCandidatureAndOffreTitleByIdOffre(@Param("idOffre") Long idOffre);
}
