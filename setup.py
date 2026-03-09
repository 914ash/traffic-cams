"""Small environment check for the traffic-cams repo."""

import os
import sys

def check_env():
    required_keys = [
        "VITE_CESIUM_ION_TOKEN"
    ]
    
    missing = []
    print("--- traffic-cams environment check ---")
    
    for key in required_keys:
        val = os.getenv(key)
        if not val:
            missing.append(key)
            print(f"[MISSING] {key}")
        else:
            print(f"[OK] {key}")

    if missing:
        print("\n--- Action Required ---")
        if "VITE_CESIUM_ION_TOKEN" in missing:
            print("1. Get a Cesium Ion access token if you want the live 3D globe.")
            print("   URL: https://ion.cesium.com/tokens")

        print("\nThe repo also supports a demo mode that does not require live map configuration.")
        print("Add environment values to a local .env file in the project root if you want the live path.")
        return False
    
    print("\nEnvironment is ready for launch.")
    return True

if __name__ == "__main__":
    if not check_env():
        sys.exit(1)
    sys.exit(0)
