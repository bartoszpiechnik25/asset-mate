package com.bartoszpiechnik25.assetmate.repository;

import com.bartoszpiechnik25.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@Repository
@Transactional
public interface UserRepository extends JpaRepository<User, UUID> {

}
