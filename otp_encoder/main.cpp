/* Jacob Kloepper
 * November 22, 2020
 *
 * Point of program:
 * Given an input file "input.txt" of names, each on it own line,
 * assign each user a different, unique user.
 * Output an encrypted file which can be read by the js program.
 */

#include <iostream>
#include <fstream>
#include <random>
#include <vector>
#include <algorithm>

std::string one_time_pad(const std::string &key, const std::string &message) {
    // Error: Key is shorter than message.
    if (key.length() < message.length()) {
        std::cout << "Error: the length of the key [" << key.length() << "] is smaller than the length of the message to encrypt [" << message.length() << "]" << std::endl;
        exit(1);
    }

    // Perform the one-time-pad.
    std::string encrypted {message};

    for (unsigned long i = 0; i < message.length(); i++) {
        encrypted.at(i) = key.at(i) ^ message.at(i);
    }

    return encrypted;
}

template <class T>
bool verify_unique_shuffle(const std::vector<T> &pre, const std::vector<T> &post) {
    for (int i {0}; i < pre.size(); i++) {
        if (pre.at(i) == post.at(i)) {
            return false;
        }
    }
    return true;
}

template <class T>
void shuffle_vector(std::vector<T> &vec) {
    std::vector<T> init {vec};
    std::shuffle(vec.begin(), vec.end(), std::mt19937(std::random_device()()));

    while (!verify_unique_shuffle(init, vec)) {
        std::shuffle(vec.begin(), vec.end(), std::mt19937(std::random_device()()));
    }
}

int main() {
    std::string ifilename {"input.txt"};
    std::string key_filename {"keys.txt"};

    // Open files, verify
    std::ifstream ifile {ifilename};
    std::ifstream key_file {key_filename};
    if (!ifile) {
        std::cout << "Unable to open input file.";
        exit(1);
    }
    if (!key_file) {
        std::cout << "Unable to open key file.";
        exit(1);
    }

    // Get input names and keys
    std::string str {};

    std::vector<std::string> names {};
    std::vector<std::string> init_names {};
    std::vector<std::string> keys {};

    while (ifile >> str) {
        names.push_back(str);
        init_names.push_back(str);
    }
    while (key_file >> str) {
        keys.push_back(str);
    }

    // Shuffle vector
    shuffle_vector(names);

    // Write encrypted names to output file
    std::string ofilename {"encrypted.txt"};
    std::ofstream ofile {ofilename};

    for (int user {0}; user < names.size(); user++) {
        str = one_time_pad(keys.at(user), names.at(user));
        ofile << str;
    }

    return 0;
}
