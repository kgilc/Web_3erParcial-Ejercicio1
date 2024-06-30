package com.ipn.mx.domain.entity;

import java.io.Serializable;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name="Categoria")
public class Categoria implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idCategoria;
	@Column(name = "nombreCategoria", length = 100, nullable = false)
	private String nombreCategoria;
	@Column (name = "descripcionCategoria", length = 250, nullable = false)
	private String descripcionCategoria;
	@Column (name = "fechaCreacion", nullable = true)
	private Date fechaCreacion;
	
	

}
