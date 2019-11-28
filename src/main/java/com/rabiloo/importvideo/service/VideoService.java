package com.rabiloo.importvideo.service;

import com.rabiloo.importvideo.entity.VideoEntity;
import com.rabiloo.importvideo.repository.VideoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class VideoService {
    private static Logger LOGGER = LoggerFactory.getLogger(VideoService.class);

    @Autowired
    private VideoRepository repository;

    /**
     * Create
     *
     * @param entity
     * @return
     */
    public VideoEntity create(VideoEntity entity) {
        entity.setCreatedTime(new Date());
        return repository.save(entity);
    }

    /**
     * Read
     *
     * @param id
     * @return
     */
    public VideoEntity findById(Long id) {
        return repository.getOne(id);
    }

    /**
     * Update
     *
     * @param entity
     * @return
     */
    public VideoEntity update(VideoEntity entity) {
        entity.setUpdatedTime(new Date());
        return repository.save(entity);
    }

    /**
     * Delete
     *
     * @param id
     * @return
     */
    public Boolean delete(Long id) {
        VideoEntity entity = findById(id);
        entity.setDeleted(true);
        repository.save(entity);
        return true;
    }

    /**
     * Get list
     *
     * @param page
     * @return
     */
    public Page<VideoEntity> getLists(Pageable page) {
        return repository.findAll(page);
    }

    public List<VideoEntity> findAll() {
        return repository.findAll();
    }
}
