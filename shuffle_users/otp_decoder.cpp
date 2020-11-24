#include <iostream>
#include <vector>
#include <iomanip>
#include <fstream>

/* Point of program:
 * Given an input shuffled and OTP-encrypted file, the key file, and the original, unshuffled file, decrypt the file.
 * This is a prototype. On the website, a .js will decrypt the encrypted file and use it in the program.
 * No decrypted.txt file will be made.
 */

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

int main() {
    std::string ifilename {"input.txt"};
    std::string key_filename {"keys.txt"};
    std::string encrypt_filename {"encrypted.txt"};

    // Open files, verify
    std::ifstream ifile {ifilename};
    std::ifstream key_file {key_filename};
    std::ifstream encrypted_file {encrypt_filename};
    if (!ifile) {
        std::cout << "Unable to open input file.";
        exit(1);
    }
    if (!key_file) {
        std::cout << "Unable to open key file.";
        exit(1);
    }
    if (!encrypted_file) {
        std::cout << "Unable to open encrypted file.";
        exit(1);
    }

    // Get inputs
    std::vector<std::string> names {};
    std::vector<std::string> keys {};

    std::string str {};
    char ch {};

    while (ifile >> str) {
        names.push_back(str);
    }
    while (key_file >> str) {
        keys.push_back(str);
    }

    // Decrypt
    int decrypt_count {0};
    std::vector<std::string> decrypted_names {};
    std::string decrypted_str {};
    str.clear();

    while (encrypted_file >> std::noskipws >> ch) {

        str.push_back(ch);
        decrypted_str = one_time_pad(keys.at(decrypt_count), str);

        // Scan the current decryption to see if it matches a name.
        // The key order is constant, so as long as keys.txt is secure this decryption method should be
        for (const auto& name : names) {
            if (decrypted_str == name) {
                decrypted_names.push_back(decrypted_str);
                decrypt_count++;
                str.clear();
            }
        }
    }

    // Output
    std::string ofilename {"decrypted.txt"};
    std::ofstream ofile {ofilename};

    for (int user {0}; user < decrypted_names.size(); user++) {
        ofile << decrypted_names.at(user);
        if (user != decrypted_names.size()-1) {
            ofile << std::endl;
        }
    }

    return 0;
}
