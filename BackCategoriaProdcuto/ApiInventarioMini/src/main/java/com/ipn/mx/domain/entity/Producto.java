package com.ipn.mx.domain.entity;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name="Producto")
public class Producto implements Serializable{
    private static final long serialVersionUID = 1L;
    
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idProducto;
    
    @Column(name = "nombreProducto", length = 100, nullable = false)
    private String nombreProducto;
    
    @Column (name = "descripcionProducto", length = 250, nullable = false)
    private String descripcionProducto;
    
    @Column (name = "precioProducto", nullable = false)
    private float precioProducto;
    
    @Column (name = "existenciaProducto", nullable = false)
    private int existenciaProducto;
    
    @ManyToOne
    @JoinColumn(name = "idCategoria", referencedColumnName = "idCategoria", nullable = false)
    private Categoria categoria;
}
