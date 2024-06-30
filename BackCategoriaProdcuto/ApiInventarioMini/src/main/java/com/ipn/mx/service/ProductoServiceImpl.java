package com.ipn.mx.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ipn.mx.domain.entity.Producto;
import com.ipn.mx.domain.repository.ProductoRepository;

@Service
public class ProductoServiceImpl implements ProductoService{

	@Autowired
	ProductoRepository repository;
	
	@Override
	@Transactional(readOnly = false)
	public List<Producto> findAll() {
		return (List<Producto>) repository.findAll();
	}

	@Override
	public Producto findById(Long id) {
		return repository.findById(id).orElse(null);
	}

	@Override
	public Producto save(Producto producto) {
		return  repository.save(producto);
	}

	@Override
	public void delete(Long id) {
		repository.deleteById(id);
	}
	

	@Override
	public Producto showAleatory() {
		return repository.findById((long) 1).orElse(null);
		
	}

}
