package com.rabiloo.importvideo.repository;

import com.rabiloo.importvideo.entity.VideoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VideoRepository extends JpaRepository<VideoEntity,Long> {
    VideoEntity findByIdAndIsActive(Long id, Boolean isActive);
}
