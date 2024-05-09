import 'package:flutter/material.dart';
import 'package:get/get_state_manager/src/rx_flutter/rx_obx_widget.dart';
import 'package:sisgem_app/controllers/product_controller.dart';
import 'package:sisgem_app/pages/products_pages/components/list_of_products.dart';
import 'package:sisgem_app/pages/products_pages/products_details/products_detail_page.dart';
import 'package:sisgem_app/utility/responsive.dart';

class ProductsPage extends StatefulWidget {
  const ProductsPage({super.key});

  @override
  State<ProductsPage> createState() => _ProductsPageState();
}

class _ProductsPageState extends State<ProductsPage> {
  @override
  initState() {
    super.initState();
    ProductController.to.start();
  }

  Widget _start() {
    return Container();
  }

  Widget _loading() {
    return const Center(child: CircularProgressIndicator());
  }

  Widget _onError() {
    return Container();
  }

  Widget _ready() {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      body: Responsive(
        mobile: const ListOfProducts(),
        tablet: const Row(
          children: [
            Expanded(
              flex: 6,
              child: ListOfProducts(),
            ),
            Expanded(
              flex: 9,
              child: ProductDetailPage(),
            ),
          ],
        ),
        desktop: Row(
          children: [
            Expanded(
              flex: size.width > 1120 ? 3 : 5,
              child: const ListOfProducts(),
            ),
            Expanded(
              flex: size.width > 1120 ? 6 : 10,
              child: const ProductDetailPage(),
            ),
          ],
        ),
      ),
    );
  }

  Widget stateManagement(ProductControllerState state) {
    switch (state) {
      case ProductControllerState.starting:
        return _start();
      case ProductControllerState.loading:
        return _loading();
      case ProductControllerState.onError:
        return _onError();
      case ProductControllerState.ready:
        return _ready();
      default:
        return _start();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: const Text("Produtos"),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context, false),
        ),
      ),
      body: Obx(
        () {
          return stateManagement(ProductController.to.state);
        },
      ),
    );
  }
}