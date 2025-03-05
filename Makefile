.PHONY: build

build:
	rm -rf docs
	bun run build
	mv dist docs
	sed -i 's/"\//".\//g' docs/index.html
	git add docs/*
	git commit -m "build(docs): Change code"
