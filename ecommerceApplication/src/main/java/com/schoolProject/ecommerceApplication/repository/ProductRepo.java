package com.schoolProject.ecommerceApplication.repository;

import com.schoolProject.ecommerceApplication.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

// You forgot to add this annotation
@Repository
public interface ProductRepo extends JpaRepository<Product, Long> {

    List<Product> findByCategoryId(Long category);

    // I change the method name to the one below the previous one was causing issue with Jpa
    List<Product> findByNameContainingAndDescriptionContaining(String name, String description);
}
