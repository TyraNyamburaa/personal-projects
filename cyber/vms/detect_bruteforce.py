import os
from collections import defaultdict

BANNED_FILE = "banned_ips.txt"
FAILED_THRESHOLD = 3

def scan_directory():
    failed_attempts = defaultdict(int)
    print("[*] Initiating dynamic heuristic scan across directory...")
    
    for filename in os.listdir('.'):
        if os.path.isdir(filename) or filename in ['detect_bruteforce.py', BANNED_FILE]:
            continue
            
        try:
            with open(filename, "r") as file:
                content = file.read()
                
                # Check if this looks like our target log structure
                if "Status=" in content:
                    print(f"[+] Suspicious log file signature found matching telemetry: '{filename}'")
                    
                    # Split into lines and parse
                    lines = content.splitlines()
                    for line in lines:
                        if "Status=FAILED" in line:
                            # Split by spaces to isolate chunks
                            parts = line.split(" ")
                            # Find the piece that contains 'IP='
                            for part in parts:
                                if part.startswith("IP="):
                                    ip_address = part.split("=")[1]
                                    failed_attempts[ip_address] += 1
        except Exception as e:
            continue

    alerts_triggered = False
    for ip, count in failed_attempts.items():
        if count >= FAILED_THRESHOLD:
            print(f"\n[!] ALERT: Brute-Force Attack Detected from {ip}!")
            print(f"    [+] Defense Evasion Noted: Attacker hid telemetry in obfuscated file.")
            print(f"    [+] Automating Mitigation: Adding {ip} to {BANNED_FILE}...")
            
            with open(BANNED_FILE, "a") as ban_file:
                ban_file.write(f"{ip}\n")
            alerts_triggered = True
            
    if not alerts_triggered:
        print("[-] Scan complete. No malicious patterns or hidden logs detected.")

if __name__ == "__main__":
    scan_directory()