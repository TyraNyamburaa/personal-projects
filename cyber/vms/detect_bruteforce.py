from collections import defaultdict

LOG_FILE = "auth.log"
FAILED_THRESHOLD = 3


def analyze_logs():
    failed_attempts = defaultdict(int)

    print("Parsing auth.log for suspicious activity...")

    with open(LOG_FILE, "r") as file:
        for line in file:
            if "Status=FAILED" in line:
                # Extract the IP address from the log line
                parts = line.split(" ")
                ip_part = [p for p in parts if p.startswith("IP=")][0]
                ip_address = ip_part.split("=")[1]

                failed_attempts[ip_address] += 1

    # Check if any IP crossed the threshold
    alerts_triggered = False
    for ip, count in failed_attempts.items():
        if count >= FAILED_THRESHOLD:
            print(f"\nALERT: Brute-Force Attack Detected!")
            print(f"    Source IP: {ip}")
            print(f"    Failed Attempts: {count}")
            print(f"    Recommendation: Block this IP at the firewall immediately.")
            alerts_triggered = True

    if not alerts_triggered:
        print("[+] Log analysis complete. No malicious patterns detected.")


if __name__ == "__main__":
    analyze_logs()
