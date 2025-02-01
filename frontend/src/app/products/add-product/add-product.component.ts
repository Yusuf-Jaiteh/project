import { Component } from '@angular/core';
import { ProductService, Product } from '../../shared/product.service';
import { Router } from '@angular/router';
// // I changed here. Compare it with your to see the difference
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  // I changed here. Compare it with your to see the difference
  standalone: true,
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  // I changed here. Compare it with your to see the difference
  imports: [FormsModule]
})
export class AddProductComponent {
  product: Product = {
    id: '', 
    name: '',
    description: '',
    price: 0,
    image: '',
  };

  constructor(private productService: ProductService, private router: Router) {}

  onSubmit(): void {
    this.productService.addProduct(this.product).subscribe({
      next: (newProduct) => {
        console.log('Product added:', newProduct);
        alert('Product added successfully!');
        this.router.navigate(['/products']); // Navigate to the product list
      },
      error: (err) => {
        console.error('Error adding product:', err);
        alert('Failed to add product.');
      },
    });
  }
}
