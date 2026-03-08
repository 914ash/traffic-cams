"""
ABOUTME: Setup and diagnostic script for Stitch UI.
ABOUTME: Verifies environment variables and provides instructions for API key provisioning.
"""

import os
import sys

def check_env():
    required_keys = [
        "GOOGLE_MAPS_API_KEY",
        "CESIUM_ION_TOKEN"
    ]
    
    missing = []
    print("--- Stitch UI Environment Check ---")
    
    for key in required_keys:
        val = os.getenv(key)
        if not val:
            missing.append(key)
            print(f"[MISSING] {key}")
        else:
            print(f"[OK] {key}")

    if missing:
        print("\n--- Action Required ---")
        if "GOOGLE_MAPS_API_KEY" in missing:
            print("1. Get a Google Maps API Key with 'Photorealistic 3D Tiles' enabled.")
            print("   URL: https://console.cloud.google.com/google/maps-apis/credentials")
        if "CESIUM_ION_TOKEN" in missing:
            print("2. Get a Cesium Ion Access Token.")
            print("   URL: https://ion.cesium.com/tokens")
        
        print("\nPlease add these to your .env file in the project root.")
        return False
    
    print("\nEnvironment is ready for launch.")
    return True

if __name__ == "__main__":
    if not check_env():
        sys.exit(1)
    sys.exit(0)
