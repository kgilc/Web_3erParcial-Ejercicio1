package com.ipn.mx.service;

import java.util.List;

import com.ipn.mx.domain.entity.Categoria;

public interface CategoriaService {

	public List<Categoria> findAll();
	public Categoria findById(Long id);
	public Categoria save (Categoria tarea);
	public void delete(Long id);
	public Categoria showAleatory();
}
