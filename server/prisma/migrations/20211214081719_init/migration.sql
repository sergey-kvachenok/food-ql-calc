-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
