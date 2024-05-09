import 'package:flutter/material.dart';
import 'package:sisgem_app/controllers/product_controller.dart';
import 'package:sisgem_app/controllers/product_detail_controller.dart';
import 'package:sisgem_app/pages/products_pages/components/products_card.dart';
import 'package:sisgem_app/pages/products_pages/products_details/products_detail_page.dart';
import 'package:sisgem_app/utility/responsive.dart';

class ListOfProducts extends StatefulWidget {
  const ListOfProducts({super.key});

  @override
  State<ListOfProducts> createState() => _ListOfUsersState();
}

class _ListOfUsersState extends State<ListOfProducts> {
  _ListOfUsersState();

  @override
  Widget build(BuildContext context) {
    return RefreshIndicator(
      onRefresh: () => ProductController.to.start(),
      child: ListView.builder(
        itemCount: ProductController.to.products.length,
        itemBuilder: (context, index) => ProductsCard(
          product: ProductController.to.products[index],
          press: () {
            Responsive.isMobile(context)
                ? Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => ProductDetailPage(
                          product: ProductController.to.products[index].id),
                    ),
                  )
                : ProductDetailController.to
                    .loadUser(ProductController.to.products[index].id!);
          },
        ),
      ),
    );
  }
}
