#!/bin/bash

[ "$(whoami)" == "root" ] || { echo "Must be run as sudo!"; exit 1; }

# Install dependencies
if [ ! `which hdparm` ]; then
  apt-get install -y hdparm
fi
if [ ! `which sysbench` ]; then
  apt-get install -y sysbench
fi
if [ ! `which speedtest-cli` ]; then
  apt-get install -y speedtest-cli
fi

# Script start!
clear
sync
echo -e "⚠️ Raspberry Pi Benchmark Test"
# Show current hardware
vcgencmd measure_temp
vcgencmd get_config int | grep arm_freq
vcgencmd get_config int | grep core_freq
vcgencmd get_config int | grep sdram_freq
vcgencmd get_config int | grep gpu_freq
printf "sd_clock="
grep "actual clock" /sys/kernel/debug/mmc0/ios 2>/dev/null | awk '{printf("%0.3f MHz", $3/1000000)}'
echo -e "\n"

echo -e "⏱ Running InternetSpeed test..."
speedtest-cli --simple

echo -e "\n⚙️ Running CPU test..."
sysbench --num-threads=4 --validate=on --test=cpu --cpu-max-prime=5000 run | grep 'total time:\|min:\|avg:\|max:' | tr -s [:space:]
vcgencmd measure_temp

echo -e "\n🔀 Running THREADS test..."
sysbench --num-threads=4 --validate=on --test=threads --thread-yields=4000 --thread-locks=6 run | grep 'total time:\|min:\|avg:\|max:' | tr -s [:space:]
vcgencmd measure_temp

echo -e "\n💾💽 Running MEMORY test..."
sysbench --num-threads=4 --validate=on --test=memory --memory-block-size=1K --memory-total-size=3G --memory-access-mode=seq run | grep 'Operations\|transferred\|total time:\|min:\|avg:\|max:' | tr -s [:space:]
vcgencmd measure_temp

echo -e "\n💾💽 Running HDPARM test..."
hdparm -t /dev/mmcblk0 | grep Timing
vcgencmd measure_temp

echo -e "\n💾💽 Running DD WRITE test..."
rm -f ~/test.tmp && sync && dd if=/dev/zero of=~/test.tmp bs=1M count=512 conv=fsync 2>&1 | grep -v records
vcgencmd measure_temp

echo -e "\n💾💽 Running DD READ test..."
echo -e 3 > /proc/sys/vm/drop_caches && sync && dd if=~/test.tmp of=/dev/null bs=1M 2>&1 | grep -v records
vcgencmd measure_temp
rm -f ~/test.tmp