package com.ipn.mx.service;

import java.util.List;

import com.ipn.mx.domain.entity.Producto;

public interface ProductoService {
	
	public List<Producto> findAll();
	public Producto findById(Long id);
	public Producto save (Producto producto);
	public void delete(Long id);
	public Producto showAleatory();

}
