.PHONY: build

build:
	rm -rf docs
	bun run build
	mv dist docs
	sed -i 's/"\//".\//g' docs/index.html
