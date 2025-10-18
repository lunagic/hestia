package backend

import (
	"embed"
	"io/fs"

	"github.com/lunagic/hestia/src/backend/internal/forge"
)

//go:embed all:resources/*
var resourcesFS embed.FS

var resources = forge.DevSafeFS{
	EmbeddedFS:   resourcesFS,
	EmbeddedPath: "resources",
	LocalPath:    "src/backend/resources",
}

func Dist() fs.FS {
	return resources.FS("dist")
}
