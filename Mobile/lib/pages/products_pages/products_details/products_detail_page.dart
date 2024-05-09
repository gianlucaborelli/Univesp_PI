import 'package:flutter/material.dart';
import 'package:get/get_state_manager/src/rx_flutter/rx_obx_widget.dart';
import 'package:sisgem_app/controllers/product_detail_controller.dart';
import 'package:sisgem_app/utility/responsive.dart';

class ProductDetailPage extends StatefulWidget {
  final String? product;

  const ProductDetailPage({super.key, this.product});

  @override
  State<ProductDetailPage> createState() => _UserDetailPageState();
}

class _UserDetailPageState extends State<ProductDetailPage> {
  @override
  void initState() {
    if (widget.product != null) {
      ProductDetailController.to.loadUser(widget.product!);
    }
    super.initState();
  }

  _ready() {
    if (ProductDetailController.to.product == null) {
      return Container();
    } else {
      return Responsive(
        mobile: Scaffold(
          appBar: AppBar(
            title: const Text('Produto'),
            centerTitle: true,
            backgroundColor: Color.fromARGB(
                255, 101, 233, 233), // Defina a cor da AppBar aqui
          ),
          body: Padding(
            padding: const EdgeInsets.all(8.0),
            child: ListView(
              padding: EdgeInsets.all(8.0),
              children: [
                _buildDetailItem(
                    "Nome", ProductDetailController.to.product!.name!),
                _buildDetailItem("Descrição",
                    ProductDetailController.to.product!.description!),
                _buildDetailItem("Preço",
                    ProductDetailController.to.product!.price!.toString()),
                _buildDetailItem("Estoque",
                    ProductDetailController.to.product!.stock!.toString()),
              ],
            ),
          ),
        ),
        desktop: Scaffold(
          body: Text(ProductDetailController.to.product!.name!),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Obx(
      () => ProductDetailController.to.isLoading.value
          ? const Center(
              child: CircularProgressIndicator(),
            )
          : _ready(),
    );
  }

  Widget _buildDetailItem(String description, String value) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          description,
          style: const TextStyle(
            fontWeight: FontWeight.bold,
            fontSize: 16,
          ),
        ),
        const SizedBox(height: 4),
        Text(
          value,
          style: const TextStyle(
            fontSize: 14,
          ),
        ),
        const SizedBox(height: 16),
      ],
    );
  }
}
