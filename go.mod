module github.com/lunagic/hestia

go 1.24.0

replace (
	github.com/lunagic/apollo => ./src/backend/lib/apollo
	github.com/lunagic/athena => ./src/backend/lib/athena
	github.com/lunagic/demeter => ./src/backend/lib/demeter
	// github.com/lunagic/poseidon => ./src/backend/lib/poseidon
	github.com/lunagic/zeus => ./src/backend/lib/zeus
)

require (
	github.com/lunagic/poseidon v0.0.11
	github.com/spf13/cobra v1.9.1
)

require (
	github.com/inconshreveable/mousetrap v1.1.0 // indirect
	github.com/spf13/pflag v1.0.6 // indirect
)
