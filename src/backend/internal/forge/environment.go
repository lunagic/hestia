package forge

import (
	"errors"
	"io"
	"io/fs"
	"os"
	"strings"
)

func NewEnvironment() Environment {
	return Environment{
		values: map[string]string{},
	}
}

func NewEnvironmentFromSystem() Environment {
	env := NewEnvironment()

	// Load in the existing system variables
	for _, e := range os.Environ() {
		pair := strings.SplitN(e, "=", 2)
		env.values[pair[0]] = pair[1]
	}

	return env
}

type Environment struct {
	values map[string]string
}

func (env Environment) IncludeFile(fileSystem fs.FS, path string) error {
	envFile, err := fileSystem.Open(path)
	if err != nil {
		if errors.Is(err, os.ErrNotExist) {
			return nil
		}

		return err
	}

	return env.parse(envFile)

}

func (env Environment) parse(reader io.Reader) error {
	bodyBytes, err := io.ReadAll(reader)
	if err != nil {
		return err
	}

	for _, line := range strings.Split(string(bodyBytes), "\n") {
		parts := strings.SplitN(line, "=", 2)
		if len(parts) < 2 {
			continue
		}

		key := parts[0]
		value := parts[1]

		// Skip the env variable is already set
		if _, alreadySet := env.values[key]; alreadySet {
			continue
		}

		// Set the value
		env.values[key] = value
	}

	return nil
}
