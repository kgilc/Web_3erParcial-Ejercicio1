package com.ipn.mx.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.ipn.mx.domain.entity.Categoria;
import com.ipn.mx.service.CategoriaService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/apiCategoria")
public class CategoriaController {
    @Autowired
    CategoriaService service;
    
    @GetMapping("/categorias")
    public List<Categoria> readAll(){
        return service.findAll();
    }
    
    @DeleteMapping("/categorias/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            service.delete(id);
            return ResponseEntity.noContent().build();
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("No se puede eliminar la categoría porque tiene productos asociados.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error interno del servidor.");
        }
    }
    
    @GetMapping("/categorias/{id}")
    public Categoria read(@PathVariable Long id) {
        return service.findById(id);
    }
    
    @PutMapping("/categorias/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public Categoria update(@RequestBody Categoria categoria, @PathVariable Long id) {
        Categoria c = service.findById(id);
        c.setNombreCategoria(categoria.getNombreCategoria());
        c.setDescripcionCategoria(categoria.getDescripcionCategoria());
        c.setFechaCreacion(categoria.getFechaCreacion());
        return service.save(c);
    }

    @GetMapping("/categorias/random")
    public Categoria getRandomCategoria() {
        return service.showAleatory();
    }

    @PostMapping("/categorias")
    @ResponseStatus(HttpStatus.CREATED)
    public Categoria create(@RequestBody Categoria categoria) {
        return service.save(categoria);
    }
}
