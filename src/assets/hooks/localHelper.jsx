// File: assets/hooks/localHelper.js
import { quizChoose } from "../data/QuizCategory";

const LOCAL_STORAGE_KEY = "QuizStorage";
const LOGGED_IN_USER_KEY = "loggedInUser";

// Ambil data pengguna dari localStorage
export const getQuizStorage = () => {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// Simpan data pengguna ke localStorage
export const setQuizStorage = (data) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
};

// Tambahkan pengguna baru
export const addUser = (user) => {
  const users = getQuizStorage();

  const existingUser = users.find((u) => u.email === user.email);
  if (existingUser) {
    throw new Error("Email already exists.");
  }

  const difficulties = ["easy", "medium", "hard"];
  const bestScore = {};

  quizChoose.forEach(({ category }) => {
    bestScore[category] = {};
    difficulties.forEach((difficulty) => {
      bestScore[category][difficulty] = 0;
    });
  });

  const quizState = null;
  const newUser = { ...user, bestScore, quizState };
  users.push(newUser);

  setQuizStorage(users);
};

// Tambahkan status quiz untuk pengguna
export const updateQuizState = (email, quizState) => {
  const users = getQuizStorage();
  const userIndex = users.findIndex((u) => u.email === email);

  if (userIndex === -1) {
    throw new Error("User not found.");
  }

  const user = users[userIndex];
  user.quizState = quizState;

  users[userIndex] = user;
  setQuizStorage(users);

  // Perbarui loggedInUser jika sedang aktif
  const loggedInUser = localStorage.getItem(LOGGED_IN_USER_KEY);
  if (loggedInUser) {
    const parsedUser = JSON.parse(loggedInUser);
    if (parsedUser?.email === email) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
    }
  }
};

export const deleteQuizState = (email) => {
  const users = getQuizStorage();
  const userIndex = users.findIndex((u) => u.email === email);

  if (userIndex === -1) {
    throw new Error("User not found.");
  }

  const user = users[userIndex];
  user.quizState = null;

  users[userIndex] = user;
  setQuizStorage(users);

  // Perbarui loggedInUser jika sedang aktif
  const loggedInUser = localStorage.getItem(LOGGED_IN_USER_KEY);
  if (loggedInUser) {
    const parsedUser = JSON.parse(loggedInUser);
    if (parsedUser?.email === email) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
    }
  }
};

// Ambil status quiz untuk pengguna
export const getQuizState = (email) => {
  const users = getQuizStorage();
  const user = users.find((u) => u.email === email);
  return user?.quizState || null;
};

// Hapus status quiz untuk pengguna
export const clearQuizState = (email) => {
  const users = getQuizStorage();
  const userIndex = users.findIndex((u) => u.email === email);

  if (userIndex === -1) {
    throw new Error("User not found.");
  }

  const user = users[userIndex];
  user.quizState = null;

  users[userIndex] = user;
  setQuizStorage(users);

  // Perbarui loggedInUser jika sedang aktif
  const loggedInUser = localStorage.getItem(LOGGED_IN_USER_KEY);
  if (loggedInUser) {
    const parsedUser = JSON.parse(loggedInUser);
    if (parsedUser?.email === email) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
    }
  }
};

// Login pengguna
export const loginUser = (email, password) => {
  const users = getQuizStorage();
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    throw new Error("Invalid email or password.");
  }

  // Simpan data user ke localStorage
  localStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(user));
  return user;
};

// Perbarui skor terbaik pengguna
export const updateBestScore = (email, score, category, difficulty) => {
  const users = getQuizStorage();
  const userIndex = users.findIndex((u) => u.email === email);
  if (userIndex === -1) {
    throw new Error("User not found.");
  }
  const user = users[userIndex];

  // Validasi struktur bestScore
  if (!user.bestScore || !user.bestScore[category]) {
    throw new Error("Invalid category or difficulty.");
  }
  // Perbarui skor hanya jika lebih tinggi dari yang sebelumnya
  if (user.bestScore[category][difficulty] < score) {
    user.bestScore[category][difficulty] = score;
  }

  users[userIndex] = user;
  setQuizStorage(users);

  // Perbarui loggedInUser jika sedang aktif
  const loggedInUser = localStorage.getItem(LOGGED_IN_USER_KEY);
  if (loggedInUser) {
    const parsedUser = JSON.parse(loggedInUser);
    if (parsedUser?.email === email) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
    }
  }
};

// Ambil data pengguna yang sedang login
export const getLoggedInUser = () => {
  const user = localStorage.getItem(LOGGED_IN_USER_KEY);
  return user ? JSON.parse(user) : null;
};

// Logout pengguna
export const logoutUser = () => {
  localStorage.removeItem(LOGGED_IN_USER_KEY);
};
