package com.ipn.mx.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ipn.mx.domain.entity.Categoria;
import com.ipn.mx.domain.repository.CategoriaRepository;

@Service
public class CategoriaServiceImpl implements CategoriaService{

	@Autowired
	CategoriaRepository repository;
	
	@Override
	@Transactional(readOnly = false)
	public List<Categoria> findAll() {
		return (List<Categoria>) repository.findAll();
	}

	@Override
	public Categoria findById(Long id) {
		return repository.findById(id).orElse(null);
	}

	@Override
	public Categoria save(Categoria categoria) {
		return  repository.save(categoria);
	}

	@Override
	public void delete(Long id) {
		repository.deleteById(id);
	}
	

	@Override
	public Categoria showAleatory() {
		return repository.findById((long) 1).orElse(null);
		
	}

}
