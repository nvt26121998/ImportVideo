package com.rabiloo.importvideo.api;

import com.rabiloo.importvideo.entity.VideoEntity;
import com.rabiloo.importvideo.service.VideoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/video")
public class VideoResource {
    public static Logger LOGGER = LoggerFactory.getLogger(VideoResource.class);

    @Autowired
    private VideoService service;

    @PostMapping("/create")
    public ResponseEntity<VideoEntity> save(@RequestBody VideoEntity entity) {
        LOGGER.info("Call api create video");
        return ResponseEntity.ok(service.create(entity));
    }

    @GetMapping("/{id}")
    public ResponseEntity<VideoEntity> get(@RequestParam("id") Long id) {
        LOGGER.info("Call api get video");
        return ResponseEntity.ok(service.findById(id));
    }

    @PutMapping("update")
    public ResponseEntity<VideoEntity> update(@RequestBody VideoEntity entity) {
        LOGGER.info("Call api update video");
        return ResponseEntity.ok(service.update(entity));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Boolean> delete(@RequestParam("id") Long id) {
        LOGGER.info("Call api delete video");
        if (service.delete(id)) {
            return ResponseEntity.ok().body(true);
        } else {
            return ResponseEntity.ok().body(false);
        }
    }

    @GetMapping("/list")
    public Page<VideoEntity> list(@RequestParam(value = "page", defaultValue = "1") int page,
                                  @RequestParam(value = "size", defaultValue = "20") int size,
                                  @RequestParam(value = "sort_by", defaultValue = "createdTime") String sortField) {

        LOGGER.info("Call api list video");
        return service.getLists(PageRequest.of(page - 1, size, Sort.by(sortField)));
    }
}
