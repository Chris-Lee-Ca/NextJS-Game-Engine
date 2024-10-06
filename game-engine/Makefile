TEMP_DIR := ./temp-package

.PHONY: all build clean pack

all: build pack clean

# Run the build process
build:
	@echo "Step Build: Running npm run build..."
	npm run build

# Pack the dist folder content into the root and create a temporary package
pack:
	@echo "Step Pack: Creating temporary directory..."
	mkdir -p $(TEMP_DIR)

	@echo "Step Pack: Copying necessary files to temporary directory..."
	cp -r dist/* $(TEMP_DIR)/
	cp package.json $(TEMP_DIR)/
	cp README.md $(TEMP_DIR)

	@echo "Step Pack: Packing the contents from the temporary directory..."
	(cd $(TEMP_DIR) && npm pack)

	@echo "Step Pack: Moving packed file to the root..."
	mv $(TEMP_DIR)/*.tgz ./

# Clean up any dist folder & temp folder
clean:
	@echo "Step Clean: Cleaning up..."
	rm -rf dist $(TEMP_DIR)
