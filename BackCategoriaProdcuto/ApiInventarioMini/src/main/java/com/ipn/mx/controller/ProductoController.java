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

import com.ipn.mx.domain.entity.Producto;
import com.ipn.mx.service.ProductoService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/apiProducto")
public class ProductoController {
    @Autowired
    ProductoService service;

    @GetMapping("/productos")
    public List<Producto> readAll() {
        return service.findAll();
    }

    @DeleteMapping("/productos/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            service.delete(id);
            return ResponseEntity.noContent().build();
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("No se puede eliminar el producto porque tiene asociaciones.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error interno del servidor.");
        }
    }

    @GetMapping("/productos/{id}")
    public Producto read(@PathVariable Long id) {
        return service.findById(id);
    }

    @PutMapping("/productos/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public Producto update(@RequestBody Producto producto, @PathVariable Long id) {
        Producto p = service.findById(id);
        p.setNombreProducto(producto.getNombreProducto());
        p.setDescripcionProducto(producto.getDescripcionProducto());
        p.setCategoria(producto.getCategoria());
        p.setExistenciaProducto(producto.getExistenciaProducto());
        p.setPrecioProducto(producto.getPrecioProducto());
        return service.save(p);
    }

    @GetMapping("/productos/random")
    public Producto getRandomProducto() {
        return service.showAleatory();
    }

    @PostMapping("/productos")
    @ResponseStatus(HttpStatus.CREATED)
    public Producto create(@RequestBody Producto producto) {
        return service.save(producto);
    }
}
