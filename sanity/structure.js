export const myStructure = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Products by Category')
        .child(
          S.list()
            .title('Product Categories')
            .items([
              S.listItem()
                .title("Men's Products")
                .child(
                  S.documentList()
                    .title("Men's Products")
                    .filter('_type == "product" && category == "men"')
                ),
              S.listItem()
                .title("Women's Products")
                .child(
                  S.documentList()
                    .title("Women's Products")
                    .filter('_type == "product" && category == "women"')
                ),
              S.listItem()
                .title("Home & Living Products")
                .child(
                  S.documentList()
                    .title("Home & Living Products")
                    .filter('_type == "product" && category == "home_living"')
                ),
              S.divider(),
              S.listItem()
                .title('All Products')
                .child(S.documentTypeList('product').title('All Products')),
            ])
        ),
      S.divider(),
      // List out all other document types (Banners, Site Settings, Deal Grids, etc.)
      ...S.documentTypeListItems().filter(
        (listItem) => !['product'].includes(listItem.getId())
      ),
    ]);
