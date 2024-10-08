package com.example.demo.repository;
import com.example.demo.model.Candidat;
import com.example.demo.model.Offre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;


@Repository
public interface CandidatRepository extends JpaRepository<Candidat, Long> {
    static List<Candidat> findByGouvernoratNom(String nom) {
        return null;
    }

    static List<Candidat> findByCiviliteNom(String nom) {
        return List.of();
    }

    void deleteCandidatById(Long id);
    void deleteByid(Long id); // Je suppose que c'est une faute de frappe et que c'est censé être deleteById

    @Query("SELECT c FROM Candidat c WHERE c.email = :email")
    Candidat findByEmail(@Param("email") String email);

}
