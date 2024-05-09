import 'package:flutter/material.dart';
import 'package:sisgem_app/model/product_model.dart';

class ProductsCard extends StatelessWidget {
  final Product product;
  final VoidCallback? press;

  const ProductsCard({super.key, required this.product, this.press});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        ListTile(
          leading: CircleAvatar(
            child: ClipOval(
              child: Container(
                child: product.photoURL != null
                    ? Image.network(
                        product.photoURL!,
                        fit: BoxFit.cover,
                      )
                    : const FittedBox(
                        fit: BoxFit.fill,
                        child: Icon(
                          Icons.info_outline,
                          size: 100,
                        ),
                      ),
              ),
            ),
          ),
          title: Text(product.name ?? 'err'),
          subtitle: Text(product.description ?? 'err'),
          onTap: press,
        ),
        const Divider()
      ],
    );
  }
}
