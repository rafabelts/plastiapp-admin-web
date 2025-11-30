export class Product {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly price: number,
        public readonly category: string,
        public readonly categoryId: number,
        public readonly createdAt: string,
        public readonly updatedAt: string,
    ) { }
}
